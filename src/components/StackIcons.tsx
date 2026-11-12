const stack = [
  { name: 'React', slug: 'react', color: '#149eca' },
  { name: 'Next.js', slug: 'nextdotjs', color: '#1c1917' },
  { name: 'TypeScript', slug: 'typescript', color: '#3178c6' },
  { name: 'Tailwind CSS', slug: 'tailwindcss', color: '#0e7490' },
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
    <ul className="flex flex-wrap gap-2.5">
      {stack.map((item) => (
        <li key={item.slug}>
          <span
            title={item.name}
            className="grid size-11 place-items-center rounded-xl shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 dark:ring-white/10"
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
