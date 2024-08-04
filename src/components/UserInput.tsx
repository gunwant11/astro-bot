import { Button, DatePicker, Input, Select, SelectItem } from '@nextui-org/react'
import React from 'react'
import { parseDate, } from "@internationalized/date";
interface IUserInput {
    setUserDetails: (name: string, age: number, dob: string, starSign: string) => void
    startChat: boolean
}

const SIGNS = [
    { label: 'Aries', value: 'aries' },
    { label: 'Taurus', value: 'taurus' },
    { label: 'Gemini', value: 'gemini' },
    { label: 'Cancer', value: 'cancer' },
    { label: 'Leo', value: 'leo' },
    { label: 'Virgo', value: 'virgo' },
    { label: 'Libra', value: 'libra' },
    { label: 'Scorpio', value: 'scorpio' },
    { label: 'Sagittarius', value: 'sagittarius' },
    { label: 'Capricorn', value: 'capricorn' },
    { label: 'Aquarius', value: 'aquarius' },
    { label: 'Pisces', value: 'pisces' },
]


const UserInput = ({ setUserDetails, startChat }: IUserInput) => {

    const [name, setName] = React.useState('')
    const [age, setAge] = React.useState('')
    const [dob, setDob] = React.useState(parseDate("2024-04-04"))
    const [starSign, setStarSign] = React.useState<Set<string>>(new Set());
    const [error, setError] = React.useState('')

    return (
        <div className='px-6  py-8 rounded-xl w-[500px]  bg-zinc-900'>
            <div className='font-medium mb-2' >Name</div>
            <Input className='mb-5' value={name} onChange={(e) => setName(e.target.value)} disabled={startChat} />
            <div className='font-medium mb-2' >Age</div>
            <Input className='mb-5' value={age} onChange={(e) => setAge(e.target.value)} type='number' disabled={startChat} min={0} max={100} />
            <div className='font-medium mb-2' >Date of Birth</div>
            <DatePicker className='mb-5' value={dob} showMonthAndYearPickers onChange={setDob} isDisabled={startChat} />
            <div className='font-medium mb-2' >Star Sign</div>
            <Select className='mb-5' placeholder="Select an animal"
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

            <div className='text-red-500'>{error}</div>
            <Button
                disabled={startChat}
                onClick={() => {
                    if (name === '' || age === '' || dob === null || starSign.size === 0) {
                        setError('Please fill in all fields')
                    } else {
                        setError('')
                        setUserDetails(name, parseInt(age), dob.toString(), Array.from(starSign)[0])
                    }
                }}>Submit</Button>
        </div>
    )
}

export default UserInput