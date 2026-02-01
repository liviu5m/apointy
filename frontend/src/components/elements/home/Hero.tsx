
const Hero = () => {
  return (
    <div className="pb-30">
      <h1 className="text-center font-extrabold text-6xl/18 mt-10">
        Stop Losing Appointments <br /> to{" "}
        <span className="text-[#0891B2]">Phone Tag</span>
      </h1>
      <p className="text-center text-xl font-sans text-gray-500 my-5">
        Online booking and queue management for local businesses. Let customers{" "}
        <br />
        book online while you focus on providing great service.
      </p>
      <div className="flex items-center justify-center gap-5">
        <button className="px-10 py-3 rounded-lg bg-[#0891B2] text-white font-semibold cursor-pointer border border-[#0891B2]">
          Start Free Trial
        </button>
        <button className="px-10 py-3 rounded-lg bg-white font-semibold border border-gray-200 cursor-pointer">
          See How It Works
        </button>
      </div>
      <div className="mt-16 relative mx-auto max-w-5xl">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="bg-slate-100 border-b border-slate-200 px-4 py-3 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-400"></div>
            <div className="w-3 h-3 rounded-full bg-amber-400"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mock UI Elements */}
            <div className="space-y-4">
              <div className="h-8 w-3/4 bg-slate-100 rounded animate-pulse"></div>
              <div className="h-32 bg-cyan-50 rounded-lg border border-cyan-100 p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-cyan-200 rounded-full"></div>
                  <div className="h-4 w-24 bg-cyan-200 rounded"></div>
                </div>
                <div className="h-2 w-full bg-cyan-200 rounded mb-2"></div>
                <div className="h-2 w-2/3 bg-cyan-200 rounded"></div>
              </div>
              <div className="h-24 bg-slate-50 rounded-lg border border-slate-100"></div>
            </div>
            <div className="space-y-4">
              <div className="h-8 w-1/2 bg-slate-100 rounded animate-pulse"></div>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-lg shadow-sm"
                  >
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="h-3 w-20 bg-slate-200 rounded mb-1.5"></div>
                      <div className="h-2 w-12 bg-slate-100 rounded"></div>
                    </div>
                    <div className="h-6 w-16 bg-emerald-100 rounded-full"></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-8 w-2/3 bg-slate-100 rounded animate-pulse"></div>
              <div className="h-48 bg-slate-50 rounded-lg border border-slate-100 flex items-end justify-between p-4 gap-2">
                {[40, 70, 45, 90, 60].map((h, i) => (
                  <div
                    key={i}
                    className="w-full bg-cyan-500 rounded-t-sm opacity-80"
                    style={{
                      height: `${h}%`,
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-orange-400/10 rounded-full blur-3xl -z-10"></div>
      </div>
    </div>
  );
};

export default Hero;
