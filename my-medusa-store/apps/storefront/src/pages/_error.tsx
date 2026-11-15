export default function CustomError({ statusCode }: { statusCode?: number }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>{statusCode ? `Error ${statusCode}` : "An error occurred"}</h1>
      <a href="/">Go to frontpage</a>
    </div>
  )
}

CustomError.getInitialProps = ({ res, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}
