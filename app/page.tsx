import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProfileSection from "@/components/profile-section"
import ProjectsGrid from "@/components/projects-grid"
import AboutSection from "@/components/about-section"
import MangaShowcase from "@/components/manga-showcase"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2 font-comic">My Portfolio</h1>
          <div className="h-1 w-32 bg-black dark:bg-white mb-6"></div>

          <ProfileSection />
        </div>

        <Tabs defaultValue="showcase" className="mt-8 manga-tabs">
          <TabsList className="grid w-full grid-cols-4 max-w-lg tabs-list bg-transparent border-none">
            <TabsTrigger
              value="showcase"
              className="font-comic font-bold uppercase tracking-wide bg-transparent border-2 border-black dark:border-white text-black dark:text-white data-[state=active]:bg-white data-[state=active]:text-black dark:data-[state=active]:bg-black dark:data-[state=active]:text-white"
            >
              Showcase
            </TabsTrigger>
            <TabsTrigger
              value="projects"
              className="font-comic font-bold uppercase tracking-wide bg-transparent border-2 border-black dark:border-white text-black dark:text-white data-[state=active]:bg-white data-[state=active]:text-black dark:data-[state=active]:bg-black dark:data-[state=active]:text-white"
            >
              Projects
            </TabsTrigger>
            <TabsTrigger
              value="about"
              className="font-comic font-bold uppercase tracking-wide bg-transparent border-2 border-black dark:border-white text-black dark:text-white data-[state=active]:bg-white data-[state=active]:text-black dark:data-[state=active]:bg-black dark:data-[state=active]:text-white"
            >
              About Me
            </TabsTrigger>
            <TabsTrigger
              value="contact"
              className="font-comic font-bold uppercase tracking-wide bg-transparent border-2 border-black dark:border-white text-black dark:text-white data-[state=active]:bg-white data-[state=active]:text-black dark:data-[state=active]:bg-black dark:data-[state=active]:text-white"
            >
              Contact
            </TabsTrigger>
          </TabsList>
          <TabsContent value="showcase" className="mt-6">
            <MangaShowcase />
          </TabsContent>
          <TabsContent value="projects" className="mt-6">
            <ProjectsGrid />
          </TabsContent>
          <TabsContent value="about" className="mt-6">
            <AboutSection />
          </TabsContent>
          <TabsContent value="contact" className="mt-6">
            <div className="max-w-4xl mx-auto">
              <div className="bg-black p-8 rounded-3xl">
                <div className="relative min-h-[500px] flex flex-col items-center justify-center space-y-8">
                  {/* Main speech bubble with circular shape and tail */}
                  <div className="manga-speech-bubble relative bg-white dark:bg-white border-4 border-black p-8 max-w-lg mx-auto">
                    <h2 className="text-2xl font-bold mb-4 font-comic uppercase tracking-wider text-center text-black">
                      CONTACT ME
                    </h2>
                    <p className="mb-6 font-comic font-bold text-center text-black">
                      FEEL FREE TO REACH OUT THROUGH ANY OF THESE CHANNELS:
                    </p>

                    {/* Contact links in smaller bubbles */}
                    <div className="space-y-4">
                      <div className="manga-contact-bubble bg-white border-3 border-black p-3 relative rounded-2xl">
                        <a
                          href="mailto:jamal.hinton@gmail.com"
                          className="font-comic font-bold text-center text-black hover:underline"
                        >
                          📧 jamal.hinton@gmail.com
                        </a>
                      </div>

                      <div className="manga-contact-bubble bg-white border-3 border-black p-3 relative rounded-2xl">
                        <a
                          href="https://x.com/MalGsx"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-comic font-bold text-center text-black hover:underline"
                        >
                          🐦 @MalGsx
                        </a>
                      </div>

                      <div className="manga-contact-bubble bg-white border-3 border-black p-3 relative rounded-2xl">
                        <a
                          href="https://www.linkedin.com/in/jamalhinton/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-comic font-bold text-center text-black hover:underline"
                        >
                          💼 LinkedIn Profile
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Single decorative bubble */}
                  <div className="absolute top-4 right-8 manga-thought-bubble bg-white border-3 border-black p-4 rounded-2xl">
                    <p className="font-comic font-bold text-sm text-black">LET'S CONNECT!</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
