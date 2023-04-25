import React,{ useState, useEffect } from 'react';
import {View,Text,ScrollView,StyleSheet, SafeAreaView, TextInput, TouchableOpacity, ImageBackground} from 'react-native'
import { DataTable } from 'react-native-paper';

const App = () => {

  const [product, setProduct] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState(null)
  const [image, setImage] = useState('');



  useEffect(() => {
    getDetails();

  }, [])
  // console.log(product)

  const getDetails = () => {
    fetch("http://localhost:5000/list").then((result) => {
      result.json().then((resp) => {
        console.log(resp)
        setProduct(resp)
        setName(resp[0].name)
        setDescription(resp[0].description)
        setUserId(resp[0]._id)
        setDescription("");
        setName("")

      })
    })

  }
  const deleteUser = (_id) => {
    console.log(_id)
    fetch(`http://localhost:5000/delete/${_id}`, {
      method: 'DELETE'
    }).then((result) => {
      result.json().then((resp) => {
        console.log(resp)
        getDetails();
      })
    })
  }

  const selectUser = _id => {
    const index = product.findIndex(item => item._id === _id)
    console.log(index)
    console.log('id', _id)
    setName(product[index].name)
    setDescription(product[index].description)
    setUserId(product[index]._id)
  }

  const UpdateUser = () => {
    // console.log({name, description, userId })
    let item = { name, description, userId }
    fetch(`http://localhost:5000/update/${userId}`, {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item)
    }).then((result) => {
      result.json().then((resp) => {
        console.log(resp)
        getDetails();
      })
    })
  }

  const saveData = () => {
    console.log({ name, description });
    let data = { name, description, image }
    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('image', image)

    fetch("http://localhost:5000/create", {
      method: "POST",
      formData,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }).then((result) => {
      "resp"
      console.log(result, "result")
      result.json().then((resp) => {
        console.log("resp", resp)
        getDetails();

      })
    })

  }

  return (
 <View style={{backgroundColor:"#fbc2eb: #a6clee" , flex:1}}>

      
  
  <Text style={styles.txt1}>Get Api</Text>

   

<View>
<TextInput value={name} onChangeText={(text) => { setName(text) }} placeholder='Name' style={styles.txtmain} />
 <TextInput  value={description} onChangeText={(text) => { setDescription(text) }} placeholder='Description' style={styles.txtmain} />
       <View style={styles.button2}>
       <TouchableOpacity  style={styles.button} onPress={UpdateUser}><Text style={{color:"#FFF", fontWeight:"bold"}}>UpdateUser</Text></TouchableOpacity>
       <TouchableOpacity style={styles.button1} onPress={saveData}><Text style={{color:"#FFF", fontWeight:"bold"}}>Add New User</Text></TouchableOpacity>
       </View>
</View>


<DataTable style={styles.container} >
      <DataTable.Header style={styles.tableHeader} >
        <DataTable.Title   >Name</DataTable.Title>
        <DataTable.Title>Description</DataTable.Title>
        <DataTable.Title>Operation1</DataTable.Title>
        <DataTable.Title>Operation2</DataTable.Title>
      </DataTable.Header>

 {product.map((item,index)=>{
  return(
     <DataTable.Row key={index}>
    <DataTable.Cell style={{fontWeight:"bold"}}>{item.name}</DataTable.Cell >
    <DataTable.Cell>{item.description}</DataTable.Cell >
    <DataTable.Cell> <TouchableOpacity onPress={() => deleteUser(item._id)}><Text style={{color:"red", fontWeight:"bold"}}>Delete</Text></TouchableOpacity></DataTable.Cell>
     <DataTable.Cell><TouchableOpacity  onPress={() => selectUser(item._id)}><Text style={{color:"green", fontWeight:"bold"}}>Update</Text></TouchableOpacity></DataTable.Cell>
   </DataTable.Row>
  )
 }

 )}
  </DataTable>

 </View>
  )
}

export default App

const styles = StyleSheet.create({
  txtmain:{
    padding:10,
    borderWidth:1,
    borderColor:"#888",
    marginBottom:10

  },
  txt1:{
  fontSize:16,
    fontWeight:"bold",
    padding:10
  },
  button: {
    height:40,
    width:100,
    borderRadius:10,
    backgroundColor: '#8D3DAF',
    padding: 10
  },
  button1: {
    borderRadius:10,
    height:40,
    width:120,
    marginLeft:10,
    backgroundColor: '#1B98F5',
    padding: 10
  },
  button2:{
    flex:1,
    padding:10,
    justifyContent:"center",
    alignItems: 'center',
    flexDirection: 'row'
  },
  tableHeader: {
    backgroundColor: '#DCDCDC',
  }


})



