import {Input,Button,Box,Flex,Grid,GridItem,Text,Image} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'

const AdminProductPage = () => {
    const [name,setName] = useState('')
    const [price,setPrice] = useState('')
    const [image,setImage] = useState('')
    const [data,setData] = useState([])

    useEffect(()=>{
        fetch('http://localhost:8080/products').then(res=>res.json()).then(res=>setData(res))      
    },[data.length])

    const payload={
        productName:name,
        productPrice:price,
        productImage:image
    }
    const handleClick = () => {
        if(payload.productName.length>0&&payload.productImage.length>0&&payload.productPrice.length>0){
            fetch('http://localhost:8080/products',{
                method:"POST",
                body:JSON.stringify(payload),
                headers:{
                    "Content-type":"application/json"
                }
            
            })
            setImage('')
            setName('')
            setPrice('')
        }else{
            alert('Fill all the details to proceed')
        }
        
    }

    const del=(ID)=>{
        fetch('http://localhost:8080/products/'+ID,{
            method:"DELETE"      
        })
    }

    return (
        <Box>
            <Flex direction='column' mt='40px'>
                <Input mt='2%' h={['30px','40px','60x','60px']} m='auto' w={['90%','90%','40%','40%']} type="text" placeholder="Enter name of the product" value={name} onChange={(e)=>setName(e.target.value)}/>
                <Input mt='2%' h={['30px','40px','60x','60px']} m='auto' w={['90%','90%','40%','40%']} type="text" placeholder="Enter price of the product" value={price} onChange={(e)=>setPrice(e.target.value)}/>
                <Input mt='2%' h={['30px','40px','60x','60px']} m='auto' w={['90%','90%','40%','40%']} type="text" placeholder="Enter image url of the product" value={image} onChange={(e)=>setImage(e.target.value)}/>
                <Button mt='2%' h={['30px','40px','60x','60px']} m='auto' w={['90%','90%','40%','40%']} onClick={handleClick}>List my product</Button>
            </Flex>
            
            <Box mt='40px'>
                <Grid  templateRows='auto' templateColumns={['repeat(1, 1fr)','repeat(2, 1fr)','repeat(4, 1fr)','repeat(5, 1fr)']} gap={4}>
                    {data?data.map((e)=>{
                        return (
                            <GridItem style={{border:'1px solid black',width:'90%',margin:'auto'}} key={e.id}>
                                <Text>{e.productName}</Text>
                                <Text>{e.productPrice}</Text>
                                <Image width='100%' h='200px' src={e.productImage} alt="" />
                                <br />
                                <Button><Link to='/adminedit'>Edit</Link></Button>
                                <Button onClick={()=>del(e.id)}>delete</Button>
                            </GridItem>
                        )
                    }) : <h1>Start your journey by adding your product</h1>}
                </Grid>
                
            </Box>
        </Box>
    )
}

export default AdminProductPage