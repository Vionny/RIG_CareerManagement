export var wsdl = {
    link : "https://socs1.binus.ac.id/messier/GeneralApplication.svc?wsdl",
    xsd : "http://www.w3.org/2001/XMLSchema"
}
export var SOAPActionLogin ={
    soapName : "LogOnBinusianUser",
    soapAction : "Messier/IGeneralApplicationService/LogOnBinusianUser"
} 

export var soapConnector = ""

export var user = {
    name : '',
    email : '',
    role : '',
    userid : '',
    username : ''
}

export function setUser (name,email,role,userid,username){
    user.name = name,
    user.email = email,
    user.role = role,
    user.userid = userid,
    user.username = username
}