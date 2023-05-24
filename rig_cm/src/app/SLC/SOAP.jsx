import * as soapRequest from 'easy-soap-request';
const xml2js = require('xml2js');
const { encryptPassword } = require('./EncryptPassword');
const { wsdl, SOAPActionLogin, setUser, user } = require('./Cred');

export function connectToSOAP(initial, password) {
  
  const encryptedPassword = encryptPassword(initial, password);
  console.log(encryptedPassword);

  const headers = {
    'Content-Type': 'text/xml;charset=UTF-8',
    SOAPAction: SOAPActionLogin.soapAction,
  };
  const soapXML = `
  <s11:Envelope xmlns:s11='http://schemas.xmlsoap.org/soap/envelope/'>
      <s11:Body>
        <ns1:${SOAPActionLogin.soapName} xmlns:ns1='Messier'>
          <ns1:userName>${initial}</ns1:userName>
          <ns1:password>${encryptedPassword}</ns1:password>
        </ns1:${SOAPActionLogin.soapName}>
      </s11:Body>
    </s11:Envelope>
  `

  sendToSoap({
    url: wsdl.link,
    xml: soapXML,
    headers: headers,
    timeout: 10000
  })

}

async function sendToSoap(request) {
  const { response } = await soapRequest(request);
  const { headers, body, statusCode} = response;
  console.log(headers);
  console.log(body);
  console.log(statusCode);
  const parser = new xml2js.Parser();
  parser.parseString(body, (err, result) => {
    if (err) {
      return 'Wrong initial or password'
    } else {
      // Access the parsed XML data

      var userData = result['s:Envelope']['s:Body'][0]['LogOnBinusianUserResponse'][0]['LogOnBinusianUserResult'][0]
      console.log(userData['a:UserId']);
      setUser(userData['a:Name'][0],userData['a:Emails'][0]['a:StudentEmail'][1]['a:Email'][0], userData['a:Role'][0],userData['a:UserId'][0],userData['a:UserName'][0])

      console.log(user)
      return  'Success'
    }
  });
}
