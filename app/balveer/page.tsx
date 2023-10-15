type veer = {
  name: string;
  age: number;
  education: string;
};
export default function Page() {
  const person: veer = {
    education: "B.tech",
    name: "Balveer",
    age: 23,
  };
  return (
    <div>
      <h1>{person.name}</h1>
    </div>
  );
}
