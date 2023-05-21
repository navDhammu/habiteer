import {
    Alert,
    AlertIcon,
    Button,
    Card,
    CardBody,
    FormControl,
    FormLabel,
    Input,
} from '@chakra-ui/react'
import { useContext, useState } from 'react'
import { IconLogin } from '@tabler/icons-react'
import { User } from 'types/User'
import { AuthContext } from 'src/App'

export default function LoginForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const auth = useContext(AuthContext)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })
            if (!response.ok) return setError('error')
            const user = (await response.json()) as User
            auth?.updateUser(user)
        } catch (error) {
            console.log(error)
            setError('Something went wrong, please try again later.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card
            as="form"
            display="flex"
            flexDirection="column"
            gap="6"
            onSubmit={handleSubmit}
        >
            <CardBody display="flex" flexDirection="column" gap="4">
                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="name@domain.com"
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                password: e.target.value,
                            })
                        }
                        type="password"
                        placeholder="atleast 8 characters"
                    />
                </FormControl>
                {error && (
                    <Alert status="error">
                        <AlertIcon />
                        {error}
                    </Alert>
                )}
                <Button
                    isLoading={isLoading}
                    colorScheme="green"
                    type="submit"
                    disabled={isLoading}
                    rightIcon={<IconLogin />}
                >
                    Login
                </Button>
            </CardBody>
        </Card>
    )
}
