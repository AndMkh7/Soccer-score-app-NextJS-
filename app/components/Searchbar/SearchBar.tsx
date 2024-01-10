import SearchBarForm from "./SearchBarForm";

export default function SearchBar() {
    return (
        <div className="flex justify-center items-center w-full p-3 bg-black/40">
            <div className="w-1/6 flex justify-center items-center text-neutral-100">
                <a
                href={"/"}
                className="flex justify-center items-center">
                    <img
                    src="logo.png"
                    alt="logo"
                    className="w-10 object-cover rounded-full"
                    />
                </a>
            </div>
            <div className="w-4/6 flex justify-center items-center">

                <SearchBarForm/>

            </div>
            <div className="w-1/6">

            </div>
        </div>
    )
}