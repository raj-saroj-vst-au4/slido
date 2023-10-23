# Live Q&A Web App

This is a modern web application built using Next.js, Chakra UI, and Tailwind CSS, designed to facilitate live Q&A sessions in real-time. Whether you're hosting a virtual event, an online conference, or a classroom, this web app empowers you to engage with your audience seamlessly.

[![Working Proof of concept](https://https://github.com/raj-saroj-vst-au4/slido/blob/main/poc.png)](https://www.youtube.com/watch?v=xrUatkfl7Lk)

## Getting Started

1. First, Clone and Install Dependencies

```bash
git clone https://github.com/raj-saroj-vst-au4/slido.git
npm install
```

2. Create a .env file in the root dir
3. Signup for Clerk and copy paste in the empty following variables in .env

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
NEXT_PUBLIC_BACKEND_URL=http://localhost:3002/
```

4. From the Clerk Dashboard, customize the session token to

```bash
{
	"ufname": "{{user.first_name}}",
	"uimage": "{{user.image_url}}",
	"ulname": "{{user.last_name}}",
	"userid": "{{user.id}}",
	"session": "{{session.actor}}",
	"umailid": "{{user.primary_email_address}}"
}

```

5. Run the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) on your browser.

## Host Your Live Q&A Session:

- Access the web app as the host.
- Start your video stream.
- Participants can join, ask questions, and upvote them.
- Prioritize and answer questions based on upvotes.

Live Q&A Web App is a powerful tool for interactive and engaging online events. It combines Next.js, Chakra UI, Tailwind CSS, and Socket.io to create a seamless real-time Q&A experience. Try it out for your next virtual gathering and enhance your audience's engagement and participation.

## Technologies Used

- Next.js: A powerful React framework that simplifies server-rendered React applications, making it perfect for building dynamic web apps.

- Chakra UI: A customizable design system that provides a set of accessible and composable UI components, ensuring a polished and user-friendly interface.

- Tailwind CSS: A utility-first CSS framework that streamlines the styling process and enhances the overall aesthetics of the web app.

- Socket.io: The go-to library for enabling real-time, bidirectional communication between clients and the server, crucial for live messaging and upvoting.

## Contributing

I welcome contributions from the open-source community. If you have suggestions, bug reports, or feature requests, please feel free to submit issues or pull requests. Your input helps make this project even better!

## BACKEND

visit [https://github.com/raj-saroj-vst-au4/slido-backend](https://github.com/raj-saroj-vst-au4/slido-backend) for socketio backend

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deployed on Vercel

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
