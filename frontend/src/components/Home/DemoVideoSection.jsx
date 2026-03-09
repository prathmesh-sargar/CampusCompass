function DemoVideoSection() {
  return (
    <section className="w-full py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            See Campus Compass in Action
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Watch a quick walkthrough of Campus Compass to understand how
            students can easily navigate campus, find buildings, and explore
            important locations with an interactive map.
          </p>
        </div>

        {/* Video Container */}
        <div className="relative w-full overflow-hidden rounded-2xl shadow-xl aspect-video">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/I6N0fAbrXtY"
            title="Campus Compass Project Demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

      </div>
    </section>
  );
}

export default DemoVideoSection;