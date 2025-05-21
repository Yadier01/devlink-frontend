import { LinkPlataformColor } from "./LinkPlataformColor";

export default function ShowUserInfo({ data }: any) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fafafa]">
      {data.map((user: any, idx: number) => (
        <div
          className="bg-white shadow-lg p-4 h-max w-80 flex flex-col gap-8 items-center justify-between"
          key={idx}
        >
          <span className="items-center  flex  flex-col justify-center">
            <img src={user.image} className="my-3 rounded-full h-14" alt="" />
            <h1 className="font-bold  text-center  w-72 text-lg capitalize">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-sm">{user.email}</p>
          </span>

          <div className="w-full text-center">
            {user?.links?.map((link: any, idx: number) => (
              <div className="flex w-full" key={idx}>
                <a href={link.url} target="_blank" className="w-full my-1.5">
                  <LinkPlataformColor link={link} isPhone={false} />
                </a>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
