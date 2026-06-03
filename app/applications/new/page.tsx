export default async function AddApplication() {
return (
    <main className="min-h-screen bg-zinc-50 p-6">
        <div className="mx-auto max-w-3xl">
            <div className="mb-8 flex items-center justify-between">
                <h1 className="text-3xl font-bold text-zinc-900">Add Application</h1>
                <form>
                    <label htmlFor="company" className="text-zinc-900">Company Name:</label> <br></br>
                    <input type="text" id="company" placeholder="Enter Company"  className="text-zinc-900" required/><br></br>
                    <label htmlFor="role" className="text-zinc-900">Role Title:</label><br></br>
                    <input type="text" id="role" className="text-zinc-900" placeholder="Enter Role" required/><br></br>
                    <label htmlFor="status" className="text-zinc-900">Status</label><br></br>
                    <select className="bg-zinc-400" name="status" id="status" required>
                        <option className="text-zinc-900" value="Wishlist">Wishlist</option>
                        <option className="text-zinc-900" value="Applied">Applied</option>
                        <option className="text-zinc-900" value="Interview">Interview</option>
                        <option className="text-zinc-900" value="Offer">Offer</option>
                        <option className="text-zinc-900" value="Rejected">Rejected</option>
                    </select><br></br>
                    <label htmlFor="url" className="text-zinc-900">URL</label><br></br>
                    <input type='url' className="bg-zinc-400" name="url" id="url" /><br></br>
                    <label htmlFor="notes" className="text-zinc-900">Notes</label><br></br>
                    <textarea className="bg-zinc-400" name="notes" id="notes" /><br></br>
                    <input type="submit" value="Submit"></input>
                </form>
            </div>
        </div>
    </main>
)
}