function TestResult({ testResult }: any) {
  console.log("testResult", testResult);
  if (!testResult?.html_report) return null;

  // Replace heading tags with <p> to render everything uniformly
  const normalizedContent = testResult?.html_report
    .replace(/<\/?h[1-6]>/g, "<p>")
    .replace(/<\/h[1-6]>/g, "</p>");

  return (
    <div className="w-full max-h-[75vh] overflow-y-visible px-10 rounded-xl bg-[#1D4552] text-white text-[18px] leading-relaxed scroll-smooth scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent">
      <div
        className="
          space-y-4
          py-10
          [&_*]:font-normal
          [&_hr]:hidden
          [&_ul]:list-none [&_ul]:ml-0 [&_ul>li]:before:content-['']
          [&_ol]:list-none [&_ol]:ml-0 [&_ol>li]:before:content-['']
          [&_li]:ml-0 [&_li]:pl-0
        "
        style={{ fontFamily: "'PT Sans', sans-serif" }}
        dangerouslySetInnerHTML={{ __html: normalizedContent }}
      />
    </div>
  );
}

export default TestResult;
