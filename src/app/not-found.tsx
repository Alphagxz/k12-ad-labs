import Link from "next/link";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[100svh] flex-col items-start justify-center">
      <p className="label mb-4">404</p>
      <h1 className="display display-lg">Scene not found.</h1>
      <Link href="/" className="btn btn-solid mt-10">Back to home</Link>
    </section>
  );
}
