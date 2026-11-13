import { Contact } from './components/Contact'
import { Cursor } from './components/Cursor'
import { Education } from './components/Education'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { HeroBanner } from './components/HeroBanner'
import { ProjectDetail } from './components/ProjectDetail'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { TopProgress } from './components/TopProgress'
import { Router } from './lib/router'
import { useRouter } from './lib/router-context'

function Home() {
  return (
    <>
      <HeroBanner />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

function Routes() {
  const { path } = useRouter()

  if (path.startsWith('/projects/')) {
    return (
      <>
        <ProjectDetail slug={path.slice('/projects/'.length)} />
        <Footer />
      </>
    )
  }

  return <Home />
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-stone-50 text-stone-700 selection:bg-emerald-600/15 selection:text-stone-900 dark:bg-stone-950 dark:text-slate-300 dark:selection:bg-emerald-400/20 dark:selection:text-stone-100">
        <TopProgress />
        <Cursor />
        <Routes />
      </div>
    </Router>
  )
}

export default App
