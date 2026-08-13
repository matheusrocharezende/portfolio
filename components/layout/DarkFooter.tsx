export function DarkFooter() {
  return (
    <footer className="flex w-full items-center justify-center gap-5 bg-black px-10 pt-10 pb-20 text-[15px]">
      <div className="flex flex-1 flex-col gap-1">
        <p className="leading-5 text-white">Matheus Rocha —</p>
        <p className="leading-[25px] text-[#5b5e6e]">Product Designer</p>
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <p className="leading-5 text-white">Contato —</p>
        <p className="leading-[25px] text-[#5b5e6e]">matheuxdesigner@gmail.com</p>
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <p className="leading-5 text-white">Social —</p>
        <a
          href="https://www.linkedin.com/in/matheusrocharezende/"
          target="_blank"
          rel="noopener noreferrer"
          className="leading-[25px] text-[#5b5e6e] underline decoration-solid underline-offset-2"
        >
          Linkedin
        </a>
      </div>
    </footer>
  );
}
