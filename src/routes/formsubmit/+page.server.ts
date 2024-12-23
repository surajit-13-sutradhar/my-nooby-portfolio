import type { Actions } from "@sveltejs/kit"

export const actions = {
    default: async ({request}) => {
        const formData = await request.json()

        const {name, email, message} = formData

        if(!name || !email || !message) {
            return {
                status: 400,
                body: {error: 'Please fill out all fields'}
            }
        }

        // Send form data to backend
        

    }
} satisfies Actions