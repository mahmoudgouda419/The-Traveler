const AuthError = () => {
    return (
        <main className="min-h-screen flex items-center justify-center p-6">
            <div className="max-w-md text-center bg-white rounded-2xl shadow-lg p-8">
                <h1 className="text-3xl font-bold mb-4">
                    Sign In Failed
                </h1>

                <p className="text-gray-600 mb-6">
                    We couldn't complete your sign in.
                    <br />
                    Please enable third-party cookies and try again.
                </p>

                <a
                    href="/sign-in"
                    className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg"
                >
                    Back to Sign In
                </a>
            </div>
        </main>
    );
};

export default AuthError;