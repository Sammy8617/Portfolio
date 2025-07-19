import emailjs from "@emailjs/browser"

// EmailJS configuration
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_11ijmql"
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_28r6kkp"
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "MxiQjJFy8XPCYcSQ0"

export const sendEmail = async (formData: {
  name: string
  email: string
  message: string
}) => {
  try {
    // Initialize EmailJS with your public key
    emailjs.init(EMAILJS_PUBLIC_KEY)

    // Template parameters that will be sent to your email template
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      to_email: "aryangarv160504@gmail.com",
      subject: `Portfolio Contact: ${formData.name}`,
      message: formData.message,
      reply_to: formData.email,
    }

    // Send the email
    const response = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)

    if (response.status === 200) {
      return {
        success: true,
        message: "Thank you for your message! I'll get back to you soon.",
      }
    } else {
      throw new Error("Failed to send email")
    }
  } catch (error) {
    console.error("EmailJS Error:", error)
    return {
      success: false,
      message: "Sorry, there was an error sending your message. Please try again or contact me directly.",
    }
  }
}
