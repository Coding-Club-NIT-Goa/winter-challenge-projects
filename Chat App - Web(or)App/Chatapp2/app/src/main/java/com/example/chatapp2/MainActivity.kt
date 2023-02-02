package com.example.chatapp2

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.EditText
import android.widget.ImageView
import android.widget.Toast
import com.google.firebase.auth.FirebaseAuth

class MainActivity : AppCompatActivity() {
    private lateinit var edtEmail: EditText
    private lateinit var edtPassword: EditText
    private lateinit var btnLogin: Button
    private lateinit var btnSignup: Button
    private lateinit var mAuth:FirebaseAuth

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        supportActionBar?.hide()

        mAuth=FirebaseAuth.getInstance()

        //val email=email_edittext_register.text.toString()
        edtEmail = findViewById(R.id.email_edittext)
        edtPassword=findViewById(R.id.password_edittext)
        btnLogin=findViewById(R.id.login)
        btnSignup=findViewById(R.id.signup)
        val chatImage: ImageView = findViewById(R.id.imageView)
        chatImage.setImageResource(R.drawable.chat) //to show the chat logo

        btnSignup.setOnClickListener{
            val intent = Intent(this, Signup::class.java)
            startActivity(intent)
        }

        btnLogin.setOnClickListener {
            val email = edtEmail.text.toString()
            val password = edtPassword.text.toString()
            login(email,password)
        }
    }

    private fun login(email: String,password: String){
        //login user
        mAuth.signInWithEmailAndPassword(email, password)
            .addOnCompleteListener(this) { task ->
                if (task.isSuccessful) {
                    /*
                    // Sign in success, update UI with the signed-in user's information
                    Log.d(TAG, "signInWithEmail:success")
                    val user = auth.currentUser
                    updateUI(user)*/
                    val intent = Intent(this@MainActivity, Homeactivity::class.java)
                    finish()
                    startActivity(intent)
                } else {
                    // If sign in fails, display a message to the user.
                    Toast.makeText(this@MainActivity, "Login failed, try again.",Toast.LENGTH_SHORT).show()

                }
            }
    }
}