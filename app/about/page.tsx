import Image from "next/image";

const aboutData = [
  {
    title: "Full Stack Engineer",
    text: "Iam Ashley Abongwa, Iam a software Engineer seeking for an opportunity in the industry. Iam currently a student at Indian Hills Community College working towards a degree in Software development",
    Image: "/blackPlaceHolder.png"
  },
  {
    title: "Health",
    text: "Aside from school and programming, here are a few things that I spend my time on. A big goal of mine is to build a good physique. I don't have a specific look in mind; I just want to be relatively lean, strong, and healthy.",
    Image: "/blackPlaceHolder.png"
  },
  {
    title: "Entertainment",
    text: "Occasionally, I enjoy watching TV shows and movies. Personally, thrillers and supernatural series are my favorite genres. If I ever had the chance, I believe I would be the coldest vampire to ever exist.",
    Image: "/blackPlaceHolder.png"
  },
  {
    title: "Music",
    text: "While it's nothing special, I enjoy listening to music. My top three artists are Drake (Drizzy), Tory Lanez, and Brent Faiyaz, in no specific order. These three artists rarely have any misses.",
    Image: "/blackPlaceHolder.png"
  },
  {
    title: "Cooking",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas minima quisquam fugiat odio sunt sed reprehenderit temporibus mollitia, assumenda doloribus recusandae dignissimos quia alias rerum.",
    Image: "/blackPlaceHolder.png"
  },
  
]
export default function page() {
  return (
    <main>
      <div className="h-full">
        <section>
          <ul className="px-10 flex flex-col gap-5 py-10">
        {aboutData.map((data) => 
          <li 
          key={data.title}
          >
            <h2 
            className="text-2xl font-bold"
            >{data.title}</h2>
            <div
            className="bg-neutral-900 px-5 py-5 flex gap-10 items-center justify-center">
            <p>{data.text}</p>
            <Image src={data.Image} alt={`Image for ${data.title}`} width={200} height={200}/>
            </div>
          </li>
        
        )}
        </ul>
        </section>
      </div>
    </main>
  );
}
