import React, { useState, useCallback } from "react";
import { Select, SelectItem } from "@nextui-org/select";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { DatePicker } from "@nextui-org/date-picker";
import { parseDate, DateValue } from "@internationalized/date";

interface IUserInput {
    setUserDetails: (
        name: string,
        age: number,
        dob: string,
        starSign: string
    ) => void;
    startChat: boolean;
}

const SIGNS = [
    { label: "Aries", value: "aries" },
    { label: "Taurus", value: "taurus" },
    { label: "Gemini", value: "gemini" },
    { label: "Cancer", value: "cancer" },
    { label: "Leo", value: "leo" },
    { label: "Virgo", value: "virgo" },
    { label: "Libra", value: "libra" },
    { label: "Scorpio", value: "scorpio" },
    { label: "Sagittarius", value: "sagittarius" },
    { label: "Capricorn", value: "capricorn" },
    { label: "Aquarius", value: "aquarius" },
    { label: "Pisces", value: "pisces" },
];

const UserInput: React.FC<IUserInput> = ({ setUserDetails, startChat }) => {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [dob, setDob] = useState<DateValue>(parseDate("2024-04-04"));
    const [starSign, setStarSign] = useState<Set<string>>(new Set());
    const [error, setError] = useState("");

    const handleDateChange = useCallback((date: DateValue) => {
        setDob(date);
        const today = new Date();
        const birthDate = new Date(date.toString());
        let calculatedAge = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (
            monthDifference < 0 ||
            (monthDifference === 0 && today.getDate() < birthDate.getDate())
        ) {
            calculatedAge--;
        }
        setAge(calculatedAge.toString());
    }, []);

    const handleSubmit = useCallback(() => {
        if (name === "" || age === "" || !dob || starSign.size === 0) {
            setError("Please fill in all fields");
        } else {
            setError("");
            setUserDetails(
                name,
                parseInt(age, 10),
                dob.toString(),
                Array.from(starSign)[0]
            );
        }
    }, [name, age, dob, starSign, setUserDetails]);

    return (
        <div className="px-6 py-6 rounded-xl w-[500px] bg-blue-950">
            <div className="font-medium mb-2 text-sm">Name</div>
            <Input
                className="mb-4"
                style={{ backgroundColor: "white" }}
                color="primary"
                placeholder="John Doe"
                classNames={{ innerWrapper: "text-white" }}
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={startChat}
            />

            <div className="font-medium mb-2 text-sm">Date of Birth</div>
            <DatePicker
                color="primary"
                classNames={{
                    innerWrapper: "text-white",
                    input: "text-white",
                    inputWrapper: "text-white",
                }}
                className="mb-4"
                value={dob}
                showMonthAndYearPickers
                onChange={handleDateChange}
                isDisabled={startChat}
            />

            <div className="font-medium mb-2 text-sm">Age</div>
            <Input
                color="primary"
                className="mb-4"
                placeholder="25"
                classNames={{ innerWrapper: "text-white", input: "text-white" }}
                value={age}
                onChange={(e) => setAge(e.target.value)}
                type="number"
                disabled={startChat}
                min={0}
                max={100}
            />

            <div className="font-medium mb-2 text-sm">Star Sign</div>
            <Select
                color="primary"
                classNames={{ innerWrapper: "text-white", value: "text-white" }}
                className="mb-4"
                placeholder="Select a Star Sign"
                selectedKeys={starSign}
                onSelectionChange={(keys) => setStarSign(keys as Set<string>)}
                disabled={startChat}
            >
                {SIGNS.map((sign) => (
                    <SelectItem key={sign.value} value={sign.value}>
                        {sign.label}
                    </SelectItem>
                ))}
            </Select>

            <div className="text-red-500 text-xs mb-2">{error}</div>
            <Button
                disabled={startChat}
                className="bg-blue-900 text-white font-bold py-3 px-8 rounded-xl"
                onClick={handleSubmit}
            >
                Submit
            </Button>
        </div>
    );
};

export default UserInput;
