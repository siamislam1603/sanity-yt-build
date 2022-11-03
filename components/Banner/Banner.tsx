const Banner = () => {
  return (
    <div className="flex items-center justify-between px-10 bg-yellow-400 py-10 lg:py-5 xl:py-0 border-y border-black">
      <div className="space-y-5 max-w-xl">
        <h1 className="text-6xl">
          <span className="underline decoration-4">Medium</span> is a place to
          write, read and connect
        </h1>
        <h2>
          It's easy and free to post your thinking on any topic and connect with
          millions of readers.
        </h2>
      </div>
      <img src="/assets/images/medium-trademark.png" alt="" className="h-32 lg:h-full object-contain hidden md:inline-flex" />
    </div>
  );
};

export default Banner;
