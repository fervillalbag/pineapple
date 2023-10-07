import { Text } from "../ui";

export default function Header() {
  return (
    <div>
      <div
        className={`w-screen bg-white pt-4 px-5 flex items-center`}
      >
        <div className="w-full flex items-center justify-between">
          <button className="flex items-center">
            <Text className="font-[Cantarell] text-2xl uppercase font-bold text-@sura-primary-900">
              Sura<span className="font-normal lowercase">.sh</span>
            </Text>
          </button>
          <button className="border p-2 text-@sura-primary-900 rounded-md bg-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M1 1.75A.75.75 0 011.75 1h1.628a1.75 1.75 0 011.734 1.51L5.18 3a65.25 65.25 0 0113.36 1.412.75.75 0 01.58.875 48.645 48.645 0 01-1.618 6.2.75.75 0 01-.712.513H6a2.503 2.503 0 00-2.292 1.5H17.25a.75.75 0 010 1.5H2.76a.75.75 0 01-.748-.807 4.002 4.002 0 012.716-3.486L3.626 2.716a.25.25 0 00-.248-.216H1.75A.75.75 0 011 1.75zM6 17.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
