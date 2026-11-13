const stack = [
  { name: 'React', slug: 'react', color: '#149eca' },
  { name: 'Next.js', slug: 'nextdotjs', color: '#1c1917' },
  { name: 'TypeScript', slug: 'typescript', color: '#3178c6' },
  { name: 'Tailwind', slug: 'tailwindcss', color: '#0e7490' },
  { name: 'Node.js', slug: 'nodedotjs', color: '#3c873a' },
  { name: 'Go', slug: 'go', color: '#007d9c' },
  { name: 'Rust', slug: 'rust', color: '#b7410e' },
  { name: 'Kotlin', slug: 'kotlin', color: '#6a3fd8' },
  { name: 'Python', slug: 'python', color: '#3776ab' },
  { name: 'Docker', slug: 'docker', color: '#1d7fc4' },
  { name: 'MongoDB', slug: 'mongodb', color: '#3c8a3d' },
  { name: 'Electron', slug: 'electron', color: '#3b6e78' },
  { name: 'Android Studio', slug: 'androidstudio', color: '#2fa868' },
  { name: 'Prisma', slug: 'prisma', color: '#2d3748' },
]

export function StackIcons() {
  return (
    <ul className="flex flex-wrap gap-2">
      {stack.map((item) => (
        <li key={item.slug} className="group relative">
          <span
            className="pointer-events-none absolute top-full left-1/2 z-10 mt-1 -translate-x-1/2 -translate-y-1 whitespace-nowrap rounded-md bg-stone-900 px-2 py-1 text-[11px] font-medium text-stone-50 opacity-0 shadow-lg shadow-stone-900/20 transition-all duration-200 after:absolute after:bottom-full after:left-1/2 after:-translate-x-1/2 after:border-[5px] after:border-transparent after:border-b-stone-900 group-hover:translate-y-0 group-hover:opacity-100 dark:bg-stone-100 dark:text-stone-900 dark:shadow-black/40 dark:after:border-b-stone-100"
          >
            {item.name}
          </span>

          <span
            title={item.name}
            className="grid size-11 place-items-center rounded-xl shadow-sm ring-1 ring-black/5 transition duration-300 ease-out group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-stone-900/25 dark:ring-white/10 dark:group-hover:shadow-black/50"
            style={{ backgroundColor: item.color }}
          >
            <img
              src={`https://cdn.jsdelivr.net/npm/simple-icons@13/icons/${item.slug}.svg`}
              alt={item.name}
              className="size-5 brightness-0 invert"
              loading="lazy"
            />
          </span>
        </li>
      ))}
    </ul>
  )
}
