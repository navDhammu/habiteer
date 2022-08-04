import Radio from "./Radio";

export default function RadioSwitch({ name, values, habitState, onChange }) {
  return (
    <fieldset className="relative flex h-8 items-center rounded-full bg-gray-100 focus-within:shadow-lg">
      <div
        className={`absolute bg-green-500 bg-clip-content p-1 transition-all duration-500 ${
          habitState === "active" ? "left-0" : "left-1/2"
        } h-full w-1/2 transform rounded-full`}
      />
      {values.map((value) => {
        return (
          <Radio
            name={name}
            label={value}
            value={value}
            checked={habitState === value}
            onChange={onChange}
          />
        );
      })}
    </fieldset>
  );
}
