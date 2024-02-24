package com.example.demo.controller;

import com.example.demo.models.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(path = "api/v1/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("all")
    public List<User> getUsers(){
        return userService.getAllUsers();
    }

    @PostMapping("add")
    public void addUser(@RequestBody User user){
        userService.addUser(user);
    }

    @PutMapping("update")
    public void updateUser(@RequestParam("userId") long userId ,
                           @RequestParam(value = "firstName",required = false)String firstName, @RequestParam(value = "lastName",required = false) String lastName){
        userService.updateUser(userId,firstName, lastName);
    }

    @DeleteMapping("delete/{userId}")
    public void deleteUser(@PathVariable("userId") long userId){
        userService.deleteUser(userId);
    }

    @GetMapping("check")
    public String emailExist(@RequestParam String email){
        return userService.checkEmail(email);
    }

    @GetMapping("logincheck")
    public String loginCheck(@RequestParam String email, @RequestParam String password){
        return userService.loginCheck(email, password);
    }

    @GetMapping("findid")
    public long findIdByEmail(@RequestParam("email") String email){
                return userService.findIdByEmail(email);
    }

    @GetMapping("firstname")
    public String getFirstName(@RequestParam("email") String email){
        return userService.getFirstName(email);
    }
    @GetMapping("lastname")
    public String getLastName(@RequestParam("email") String email){
        return userService.getLastName(email);
    }




}
