export default function EmailVerified() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-500">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        <img
          src="/public/icons8-sofa-100.png"
          alt="Success"
          className="mx-auto mb-4 w-20 h-20"
        />
        <h1 className="text-3xl font-bold text-green-600 mb-2">
          Verification Successful!
        </h1>
        <p className="text-gray-700 mb-6">
          Your email has been verified. You can now log in and enjoy all
          features of Furnishop.
        </p>
        <a
          href="/login"
          className="inline-block px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
        >
          Go to Login
        </a>
      </div>
    </div>
  );
}
