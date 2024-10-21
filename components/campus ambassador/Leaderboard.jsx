import cn from 'classnames';
const Leaderboard = ({className = ""}) => {
    const leaderboard = [
        { name: "Alice", points: 1900 ,college: "IIT-BHU" },
        { name: "Bob", points: 1400 ,college: "IIT-BHU" },
        { name: "John Doe", points: 1200 ,college: "IIT-BHU" },
        { name: "John Doe", points: 1200 ,college: "IIT-B" },
        { name: "John Doe", points: 1200 ,college: "IIT-B" },
        { name: "John Doe", points: 1200 ,college: "IIT-D" },
        { name: "John Doe", points: 1200 ,college: "IIT-D" },
        { name: "John Doe", points: 1900 ,college: "IIT-D" },
        { name: "John Doe", points: 1100 ,college: "IIT-K" },
        { name: "John Doe", points: 1100 ,college: "MIT(Manipal not Massachusetts)" },
        { name: "John Doe", points: 1100 ,college: "IIT-BHU" },
        { name: "John Doe", points: 1100 ,college: "IIT-BHU" },
        { name: "John Doe", points: 1100 ,college: "IIT-BHU" },
        { name: "John Doe", points: 1100 ,college: "IIT-BHU" },
    ];
    return(
        <div className={cn("xyz", className)}>
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                    <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
                        <div className="grid grid-cols-4 font-bold bg-gray-200 p-3 rounded-md mb-3">
                            <div className="col-span-1">Rank</div>
                            <div className="col-span-1">Name</div>
                            <div className="col-span-1">Points</div>
                            <div className="col-span-1">College</div>
                        </div>
                <div className="divide-y divide-gray-200">
                         {leaderboard
                          .sort((a, b) => b.points - a.points)
                        .slice(0, 10)
                        .map((leader, index) => (
                        <div className="grid grid-cols-4 font-bold bg-gray-200 p-3 rounded-md">
                        <div className="col-span-1 justify-center items-center">{index + 1}</div>
                        <div className="col-span-1 justify-center items-center">{leader.name}</div>
                        <div className="col-span-1 justify-center items-center">{leader.points}</div>
                        <div className="col-span-1 justify-center items-center">{leader.college}</div>
                </div>
            ))}
                 </div>
        </div>
        </div>
    )
}

export default Leaderboard;