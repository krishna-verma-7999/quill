import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { pinecone } from "@/lib/pinecone";
import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";

const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const { getUser } = getKindeServerSession();

      const user = getUser();

      if (!user || !user.id) {
        throw new Error("Unauthorized");
      }

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const createdFile = await db.file.create({
        data: {
          key: file.key,
          name: file.name,
          userId: metadata.userId,
          url: `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`, // this is same as file.url but file.url sometimes just timeout that why to fix that issue we are passing direct url.
          uploadStatus: "PROCESSING",
        },
      });

      try {
        const response = await fetch(
          `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`
        );

        // step 1. make the pdf as blob
        const blob = await response.blob();

        // step 2. load this pdf into memory
        const loader = new PDFLoader(blob);

        // step 3. Extract page level text from pdf
        const pageLevelDocs = await loader.load();

        // step 4. Amount of pages (!important)
        const pagesAmt = pageLevelDocs.length;

        // vectorize and index document
        // const pinecone = await getPineconeClient();
        const pineconeIndex = pinecone.Index("quill");

        // we are using OPENai model to vectorize it
        const embeddings = new OpenAIEmbeddings({
          openAIApiKey: process.env.OPENAI_API_KEY,
        });

        // we are vectorizing it in this below step
        await PineconeStore.fromDocuments(pageLevelDocs, embeddings, {
          pineconeIndex,
          // namespace: createdFile.id,
        });

        await db.file.update({
          data: {
            uploadStatus: "SUCCESS",
          },
          where: {
            id: createdFile.id,
          },
        });

        console.log("Successfully");
      } catch (err) {
        console.log("problem is : ", err);
        await db.file.update({
          data: {
            uploadStatus: "FAILED",
          },
          where: {
            id: createdFile.id,
          },
        });
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
