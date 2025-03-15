export default function Authenticator({password, setPassword, handlePasswordSubmit}) {
  return (
      <div className="flex justify-center items-center h-screen">
        <form onSubmit={handlePasswordSubmit} className="p-6 border rounded-md shadow-lg">
          <h2 className="mb-4 text-xl">Enter Password</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="border p-2 mb-4 w-full"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded">
            Submit
          </button>
        </form>
      </div>
  )
}