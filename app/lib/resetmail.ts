import nodemailer from "nodemailer";
import { generateToken } from "./actions";
import { getFireUser } from "./firestoredb";
import { z } from "zod";

export default async function resetMail(email: string) {
  
  let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_PROVIDER,
        pass: process.env.EMAIL_PROVIDER_PASS
      }
  });

  const token = await generateToken(email) 
  
  const mailContent = {
    from: process.env.EMAIL_PROVIDER,
    to: email,
    subject:"Reset your account password",
    text: `We received a request to reset your password for your account.
        If you requested this reset, click the link below to create a new password this link expires after 1 hour:

        https://course-app-one.vercel.app/changepassword?token=${token}
        
        If you didn't request a password reset, please ignore this email.`,
    //html: "<p>HTML version of the message</p>",
  };
  
  try {
    // validate user input on server
    const userEmail = z.string().email();
    userEmail.parse(email);

    const user = await getFireUser(email);
        
    if (user) {
        
        const info = await transporter.sendMail(mailContent)  

        console.log(info);

      return { status: true, message: 'Email sent successfully!' }

    } else {

      console.error(email, "this mail is not registered");

      return { status: true, message: "This Email isn't registerd!" }

    }

  } catch (error) {
    
    console.error(error,"error sending reset mail");
    
    return { status: false, message: 'Error sending email please try again!' }
  
  }

}
