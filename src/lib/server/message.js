// place files you want to import through the `$lib` alias in this folder.
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API)

(async function sendEmail(email, message) {
    try {
        const { data, error } = await resend.emails.send({
            from: {email},
            to: ['surajitsutradhardes@gmail.com'],
            subject: "Let's make something amazing together",
            html: {message},
        });
        
            if (error) {
                return console.error({ error });
            }
        
            console.log('Email sent successfully:', data);
        } catch (error) {
            console.error('An error occurred:', error);
        }
})();

export async function POST({ request }) {
    const { email, message } = await request.json();  // Get data from the request body
  
    try {
        const result = await sendEmail(email, message);
        return new Response(JSON.stringify({ success: true, data: result }), {
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 500,
        });
    }
  }

export default sendEmail
