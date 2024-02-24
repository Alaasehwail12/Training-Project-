package com.example.demo.service;

import com.example.demo.models.Book;
import com.example.demo.models.User;
import com.example.demo.repository.BookRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BookRepository bookRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public void addUser(User user) {
        Optional<User> userOptional = userRepository.findById(user.getUserId());

        if(userOptional.isPresent()){
            throw new IllegalStateException("The user already exist");
        }
        userRepository.save(user);
    }

    @Transactional
    public void updateUser(long userId, String newFirstName, String newLastName) {
        User oldUser =  userRepository.findById(userId).orElseThrow(
                () -> new IllegalStateException("User you want to update does not exist!")
        );
        if(newFirstName!= null && newFirstName.length() > 0 &&
                    !Objects.equals(newFirstName , oldUser.getFirstName())){
                            oldUser.setFirstName(newFirstName);
        }
        if(newLastName!= null && newLastName.length() > 0 &&
                !Objects.equals(newLastName , oldUser.getLastName())){
            oldUser.setLastName(newLastName);
        }
    }

    @Transactional
    public void deleteUser(long userId) {
        boolean isExist = userRepository.existsById(userId);
        if(!isExist){
            throw new IllegalStateException("User you want to delete does not exist!");
        }
        userRepository.deleteById(userId);
    }
    public String checkEmail(String email) {
        boolean isExist = userRepository.existsByEmail(email);
        if(!isExist){
            return "available";
        }
        return "taken";
    }

    public String loginCheck(String email, String password) {
        String isExist =this.checkEmail(email);
        if(isExist.compareTo("available") == 0){
            return "not registered";
        }
        else{
                    String returnedPassword = userRepository.getPasswordByEmail(email);
                    if(returnedPassword.compareTo(password) == 0 ){
                        return "correct password";
                    }
                    else{
                        return "wrong password";
                    }
        }
    }
    public long findIdByEmail(String email) {
        return userRepository.getIdByEmail(email);
    }

    public String getLastName(String email) {
        return userRepository.getLastNameByEmail(email);
    }
    public String getFirstName(String email) {
        return userRepository.getFirstNameByEmail(email);
    }
}
