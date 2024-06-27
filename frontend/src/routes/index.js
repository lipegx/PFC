import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SignIn from '../pages/SingIn';
import Welcome from '../pages/welcome';
import Register from '../pages/register';
import Home from '../pages/home';
import UserList from '../pages/Users';
import EditUserScreen from '../pages/editUsers';
import ProfileScreen from '../pages/Profile';


const stack = createNativeStackNavigator();

export default function Routes() {
    return (
        <stack.Navigator>
             <stack.Screen 
            name="Welcome" 
            component={Welcome}
            options={{headerShown: false}} 
            />
            <stack.Screen 
            name="SignIn" 
            component={SignIn} 
            options={{headerShown: false}} 
            />
            <stack.Screen 
            name="register" 
            component={Register} 
            options={{headerShown: false}} 
            />
            <stack.Screen 
            name="home" 
            component={Home} 
            options={{headerShown: false}} 
            />
            <stack.Screen 
            name="UserList" 
            component={UserList} 
            options={{headerShown: false}} 
            />
            <stack.Screen 
            name="editUser" 
            component={EditUserScreen} 
            options={{headerShown: false}} 
            />
            <stack.Screen 
            name="Feed" 
            component={ProfileScreen}
            options={{headerShown: false}} 
            />
        </stack.Navigator>
    );
}
