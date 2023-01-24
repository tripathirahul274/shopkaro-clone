import { useState } from "react"
import { Input,Button,Box,Flex,Text,InputRightElement,InputGroup } from '@chakra-ui/react'
import { Link } from "react-router-dom"

const Login = () => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [show, setShow] = useState(false)

    const payload = {
        email,password
    }

    const handleClick=()=>{
        fetch('http://localhost:8080/userssign',{
            method:"POST",
            body:JSON.stringify(payload),
            headers:{
                "Content-type":"application/json"
            }
        }).then(res=>res.json()).then(res=>{
            if(res.token){
                localStorage.setItem('token',res.token)
            }else{
                localStorage.setItem('token',123)
            }
        }).catch(err=>console.log(err))

        setEmail('')
        setPassword('')
    }
    const handleAdminClick=()=>{
        fetch('http://localhost:8080/admin',{
            method:"POST",
            body:JSON.stringify(payload),
            headers:{
                "Content-type":"application/json"
            }
        }).then(res=>res.json()).then(res=>{
            if(res.token){
                localStorage.setItem('token',res.token)
            }else{
                localStorage.setItem('token',321)
            }
        }).catch(err=>console.log(err))

        setEmail('')
        setPassword('')
    }


    return (
        <Box mt='50px' mb='50px'>
            <Flex direction='column' m='auto' w={['90%','90%','40%','40%']}>
                <Input type="text" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                <InputGroup size='md'>
                    <Input pr='4rem' type={show ? 'text' : 'password'} placeholder='Enter password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <InputRightElement width='4rem'>
                        <Button h='1.75rem' size='sm' onClick={() => setShow(!show)}>
                            { show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <Button onClick={handleClick}>Log in</Button>
                <Box>
                    <Text>Don't have an account? No worries</Text>
                    <Button>Register</Button>
                </Box>
            </Flex>
            <Flex direction='column' m='auto' mt='50px' w={['90%','90%','40%','40%']}>
                <Text color='teal' as='u' fontSize='2xl'>Login as a Seller for Shop Karo</Text>
            <Input mt='20px' type="text" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                <InputGroup size='md'>
                    <Input pr='4rem' type={show ? 'text' : 'password'} placeholder='Enter password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <InputRightElement width='4rem'>
                        <Button h='1.75rem' size='sm' onClick={() => setShow(!show)}>
                            { show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <Button onClick={handleAdminClick}>Log in</Button>
                <Box>
                    <Text>Don't have a Seller account? No worries</Text>
                    <Button><Link to='/adminsign'>Click here</Link></Button>
                </Box>
            </Flex>
            
        </Box>
    )
}

export default Login