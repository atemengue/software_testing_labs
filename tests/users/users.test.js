import { describe , expect , test,it  } from 'vitest'
import { User, userExists, createUserId } from '../../js/users/users'


     describe('test userExists function ',()=>{
        
        it('Should return False if user doesnot exist',async()=>{
          let user = new User(1,'sokoudjou');
          
          expect(await userExists(user.username)).toBeFalsy();

        });
        it('Should return True if user  exist',async()=>{
            let username = "newuser1@pluralsight.com";
            
            expect(await userExists(username)).toBeTruthy();
  
          });

        

     });

     describe('test createUserId function',()=>{

        it('Should return 2 when called', ()=>{
            
            expect(createUserId()).toBe(2);
        });
     })