1. Building Process :-
   Landing Page & Navigation --> Auth --> Functionality --> Payment --> Launch.
2. shortcut key to select whole tag => ctrl + M
3. we gonna use shadcn "npx shadcn-ui@latest init"
4. components from shacn that we are using :- Button
5. if you have purely decoration element use arial-hidden attribute. this will disable that element for screen-readers
6. https://excalidraw.com/ => perfect to make blue print of your app.
7. \_trpc file . 'underscore' specifies that this is not route file.
8. In Every file we are using TRPC we have to mark it as "use client"

# Landing Page & Navigation :-

1. we are installing "npm install clsx tailwind-merge"
2. tailwind-merge = make sure those files are combined into a single stylesheet before processing them with Tailwind.
3. clsx = used to render conditional styling
4. need to make utility function 'cn'
5. copy shadcn theme styles and put it in your tailwind.config
6. we are gonna install two plugins "npm install tailwindcss-animate @tailwindcss/typography" = to use some animation and use our text good
7. for icons we gonna use => 'npm install lucide-react'
8. we are going to use grainy style for your Landing page.

# Authentication :-

{reference => "https://rajveer7999.kinde.com/admin/cx/_:action&tab:existing::_:nav&m:application_details::_:submenu&s:quick_start&id:721c97cb67814ad6b108a023f8852b92"} 4. add

1. for authentication we are gonna use kinde :- "npm i @kinde-oss/kinde-auth-nextjs "
2. LoginLink is the component coming from @kinde.
3. Copy env variables and paste it in your .env.local and remember to put .env file in .gitignore
4. add your api endpoints

---

# ["https://kinde.com/docs/developer-tools/nextjs-sdk/]

5. You can get an authorized user’s profile from any component using the Kinde NextJS "getKindeServerSession"

# ["https://trpc.io/docs/client/nextjs/setup"]

6. we are going tRPC instead of fetch due to the better intelligence and auto-complete. but its bit tedious to setup tRPC.

7. using trpc you don't need to create api-endpoint.

a. install these dependencies :- npm install @trpc/server @trpc/client @trpc/react-query @trpc/next @tanstack/react-query zod

b. create provider component , create \_trpc folder inside app folder and create client.ts file inside \_trpc folder.

c. create trpc folder outside app folder but inside src folder

# Database :-

1. we are going to use prisma =>> npx prisma init . after this DATABASE_URL file will be generated in the env file.
2. we are going to use neon.tech for database because planet scale is asking for credit card details.
3. copy the url from neon and paste it in .env file
4. now create your model and push it in the cloud using (npx prisma generate and npx prisma db push )
5. npx prisma studio => to access the your database.
6. create prisma db folder inside source and use it.
7. npx prisma generate
8. npx prisma db push

# Dashboard Component :-

1. we gonna use shadcn dialog for modal "npx shadcn-ui@latest add dialog"
2. all component in which we are using trpc should be marked as "use client"
3. for loading state we are using skeleton => "npm install react-loading-skeleton"
4. we need to import css file to use skeleton on our layout.tsx [import 'react-loading-skeleton/dist/skeleton.css']
5. SORT-FUNCTION => if want to sort in ascending then "a-b" else "b-a"
6. we are going to format time stamps by using "npm install date-fns"
7. while creating deleteFile function in index.ts trpc file you need to make input kinnda thing that you can see by yourself. we are doing this thing because it is post request.

# Creating our pdf File uploader.

1. pdf is not like images so that we can't renderer pdf like image therefore we gonna have to use different package like :- "npm install react-pdf"
2. for dragging and dropping functionality we gonna use a library "npm install react-dropzone".
3. for loading state we are using progress bar.
4. for file uploading we have two options :-
   a. S3 which is good for scalability
   b. we are using this for development because it doesn't required any credit card credentials "uploadthing.com"
5. Full docs of uploadthing for reference :-["https://docs.uploadthing.com/getting-started/appdir"]
6. after documentation we will create uploadthing file in lib dir and install another package "npm install @uploadthing/react "

7. for notification we gonna use shadcn toast notification .

# Rendering our PDF :-

1. we gonna install react-pdf library :- ["npm install react-pdf"]
2. we gonna install 2 more css files which we imported in PdfRenderer.tsx
3. we need to add webpack in your next.config.js
4. we need to import worker as well.
5. to fixed width issue of PDF when we stretch our page... we gonna install a new light page package "npm install react-resize-detector"

6. for validation we are going to use react-hook-form "npm install react-hook-form";
7. to link useForm and Custom Validator we gonna install a new package called "npm install @hookform/resolvers"
8. for scaling feature , we are going to install another package called "npm install simplebar-react" and we also need to import css of simple bar into your layout.tsx => import "simplebar-react/dist/simplebar.min.css";

# Creating Chat Section :-

=> two main features that we gonna create => 1. optimistic updates (instant updates of message) 2. infinite queries (getting bundle of messages instead of getting all the messages at once )

1. for input we are going to install shadcn text-area component.
2. we are going to install another package "npm install react-textarea-autosize"
3. we gonna modify textarea little bit.
4. we are using a concept called semantic queries to implement our core feature. first we need to index our pdf file in core.ts
5. way we are index our pdf using vectordatabase , go to pinecone.io and create your account. Dimensions should be 1536
6. create API key in pinecone and paste it in .env
7. create separate file for pinecone under lib folder and install package (npm install @pinecone-database/pinecone)
8. for indexing creating a package called "npm install langchain" or "npm install -S langchain"
9. we have to install another package for parsing pdf "npm install pdf-parse"

# langchain is very useful package for ai related work.

10. install another package called openai and create new file called openai in lib folder.

11. npm install ai => make real time streaming lot easier

12. we are going to install react-markdown "npm install react-markdown";

13. install "npm install @mantine/hooks" = help to detect if message is intersecting the top of the viewport.

14. In normal react, you can pass ref as props so there is a trick that is forward ref (see message component)

# Payment page

1. go to the stripe make your account and create new product and copy API ID.
2. create stripe.ts under config folder and set it up.
3. we are add "tooltip" from shadcn
4. install a package (npm install stripe)
5. stripe and webhook is boiler plate that you can copy on all of your projects.
6. to get stripe webhook end point go to webhook on stripe and copy stripe webhook key .

# deployment :-

1. npm run lint => to see if you have any error
2. go to kinde and change the url.
3. create a middleware file to protect your routes.
4. to make /sign-up , /sign-in and /sign-out href work go to next.config.js file

# making the shared link good :-
