package universitymanagementsystem;
import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.sql.*;

public class login extends JFrame implements ActionListener{

    JButton login, Cancel;
    JTextField tfUsername;
    JPasswordField tfPassword;
    login(){
        setTitle("Admin Login");
        getContentPane().setBackground(Color.LIGHT_GRAY);
        setLayout(null);

        JLabel lblUsername = new JLabel("Username");
        add(lblUsername);
        lblUsername.setBounds(40,30,100,20);

        tfUsername = new JTextField();
        tfUsername.setBounds(150,30,140,20);
        add(tfUsername);
        
        JLabel lblPassword = new JLabel("Password");
        add(lblPassword);
        lblPassword.setBounds(40,60,100,20);

        tfPassword = new JPasswordField();
        tfPassword.setBounds(150,60,140,20);
        add(tfPassword);

        login = new JButton("Login");
        login.setBounds(75,105,80,30);
        login.setBackground(Color.BLACK);
        login.setForeground(Color.WHITE);
        login.setFont(new Font("Tahoma",Font.BOLD,12));
        login.addActionListener(this);
        add(login);
        
        Cancel = new JButton("Cancel");
        Cancel.setBounds(175,105,80,30);
        Cancel.setBackground(Color.BLACK);
        Cancel.setForeground(Color.WHITE);
        Cancel.setFont(new Font("Tahoma",Font.BOLD,12));
        Cancel.addActionListener(this);
        add(Cancel);

        ImageIcon loginImage = new ImageIcon(ClassLoader.getSystemResource("icons/loginIcon.png"));
        Image logimage = loginImage.getImage().getScaledInstance(120, 120, Image.SCALE_DEFAULT);
        loginImage = new ImageIcon((logimage));
        JLabel icon = new JLabel(loginImage);
        icon.setBounds(320,20,120,120);
        add(icon);

        setSize(480,200);
        setLocation(436,286);
        setVisible(true);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }

    public void actionPerformed(ActionEvent CallingObj){
        if(CallingObj.getSource() == login){
            String username = tfUsername.getText();
            String password = tfPassword.getText();

            String query = "select * from login WHERE username='"+username+"' and password='"+password+"';";

            try{
                conn c = new conn();
                ResultSet rs = c.s.executeQuery(query);

                if(rs.next()){
                    dispose();
                    new project();
                }
                else{
                    JOptionPane.showMessageDialog(null,"Invalid Username or Password");
                    
                }
            }
            catch(Exception e){
                e.printStackTrace();
            }

        }
        else if (CallingObj.getSource() == Cancel){
            dispose();
        }
    }

    public static void main(String []args){
        new login();
    }
}
