function ProfileBtn() {
    return (
        <button className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white text-sm">
                X
            </div>

            <span>Profile</span>
        </button>
    );
}

export default ProfileBtn;