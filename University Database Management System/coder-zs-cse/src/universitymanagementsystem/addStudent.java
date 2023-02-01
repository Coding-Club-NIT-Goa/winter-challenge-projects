package universitymanagementsystem;

import javax.swing.*;
import javax.swing.border.EmptyBorder;

import java.awt.*;
import java.util.*;
import com.toedter.calendar.JDateChooser;
import java.awt.event.*;

public class addStudent extends JFrame implements ActionListener{

    JTextField tfName, tfFathersName, tfMothersName, tfAddress, tfPhoneNumber, tfEmail;
    JLabel rollno;
    JDateChooser dcDob;
    JComboBox cbGender, cbDegree, cbBranch;
    JButton submit, cancel;
    DefaultListCellRenderer listRenderer = new DefaultListCellRenderer();
    
    Random ran = new Random();
    long first4 = Math.abs(ran.nextLong() % 9000L) + 1000L;
    
    addStudent(){
        setSize(800,550);
        setTitle("Add New Student Details");
        listRenderer.setHorizontalAlignment(DefaultListCellRenderer.CENTER); // center-aligned items
        setLocation(150,96);
        setLayout(null);

        JLabel heading = new JLabel("  New Student Details");
        heading.setBounds(280,30,250,50);
        heading.setFont(new Font("serif",Font.BOLD,25));
        heading.setBorder(BorderFactory.createLineBorder(Color.BLACK,2));
        add(heading);
        
        JLabel lblname = new JLabel("Name");
        lblname.setBounds(50,120,110,30);
        lblname.setFont(new Font("serif",Font.BOLD,15));
        add(lblname);
        
        tfName = new JTextField();
        tfName.setBounds(180,120,200,30);
        tfName.setFont(new Font("serif",Font.BOLD,15));
        add(tfName);
        
        JLabel lblFathersName = new JLabel("Fathers Name");
        lblFathersName.setBounds(400,120,120,30);
        lblFathersName.setFont(new Font("serif",Font.BOLD,15));
        lblFathersName.setBorder(new EmptyBorder(2,1,2,1));
        lblFathersName.setHorizontalAlignment(JLabel.RIGHT);
        add(lblFathersName);
        
        tfFathersName = new JTextField();
        tfFathersName.setBounds(540,120,200,30);
        tfFathersName.setFont(new Font("serif",Font.BOLD,15));
        add(tfFathersName);
        
        JLabel lblRollno = new JLabel("Roll Number");
        lblRollno.setBounds(50,160,110,30);
        lblRollno.setFont(new Font("serif",Font.BOLD,15));
        add(lblRollno);
        
        rollno = new JLabel("NITG0" + first4);
        rollno.setBounds(180,160,110,30);
        rollno.setFont(new Font("serif",Font.BOLD,15));
        rollno.setBorder(BorderFactory.createLineBorder(Color.BLACK,1));
        rollno.setHorizontalAlignment(JLabel.CENTER);
        add(rollno);
        
        JLabel lblMothersName = new JLabel("Mothers Name");
        lblMothersName.setBounds(400,160,120,30);
        lblMothersName.setFont(new Font("serif",Font.BOLD,15));
        lblMothersName.setBorder(new EmptyBorder(2,1,2,1));
        lblMothersName.setHorizontalAlignment(JLabel.RIGHT);
        add(lblMothersName);
        
        tfMothersName = new JTextField();
        tfMothersName.setBounds(540,160,200,30);
        tfMothersName.setFont(new Font("serif",Font.BOLD,15));
        
        add(tfMothersName);
        
        JLabel lblDOB = new JLabel("Date of Birth");
        lblDOB.setBounds(50,200,110,30);
        lblDOB.setFont(new Font("serif",Font.BOLD,15));
        add(lblDOB);
        
        dcDob = new JDateChooser();
        dcDob.setBounds(180,200,110,30);
        add(dcDob);
        
        JLabel lblGender = new JLabel("Gender");
        lblGender.setBounds(400,200,110,30);
        lblGender.setFont(new Font("serif",Font.BOLD,15));
        lblGender.setBorder(new EmptyBorder(2,1,2,1));
        lblGender.setHorizontalAlignment(JLabel.RIGHT);
        add(lblGender);
        
        String gender[] = {"Male","Female","Non Binary"};
        cbGender = new JComboBox<>(gender);
        cbGender.setRenderer(listRenderer);
        cbGender.setBounds(540,200,120,30);
        add(cbGender);
        
        JLabel lblDegree = new JLabel("Degree");
        lblDegree.setBounds(50,240,110,30);
        lblDegree.setFont(new Font("serif",Font.BOLD,15));
        add(lblDegree);
        
        String degree[] = {"BTech","MTech","PhD"};
        cbDegree = new JComboBox<>(degree);
        cbDegree.setRenderer(listRenderer);
        cbDegree.setBounds(180,240,120,30);
        add(cbDegree);
        
        JLabel lblBranch = new JLabel("Branch");
        lblBranch.setBounds(400,240,110,30);
        lblBranch.setFont(new Font("serif",Font.BOLD,15));
        lblBranch.setBorder(new EmptyBorder(2,1,2,1));
        lblBranch.setHorizontalAlignment(JLabel.RIGHT);

        add(lblBranch);
        
        String branch[] = {"CSE","ECE","EEE","MCE","CVE"};
        cbBranch = new JComboBox<>(branch);
        cbBranch.setRenderer(listRenderer);
        cbBranch.setBounds(540,240,120,30);
        add(cbBranch);
        
        JLabel lblAddress = new JLabel("Address");
        lblAddress.setBounds(50,280,110,30);
        lblAddress.setFont(new Font("serif",Font.BOLD,15));
        add(lblAddress);
        
        tfAddress = new JTextField();
        tfAddress.setBounds(180,280,560,30);
        tfAddress.setFont(new Font("serif",Font.BOLD,15));
        add(tfAddress);

        JLabel lblPhoneNumber = new JLabel("Phone Number");
        lblPhoneNumber.setBounds(50,320,110,30);
        lblPhoneNumber.setFont(new Font("serif",Font.BOLD,15));
        add(lblPhoneNumber);
        
        tfPhoneNumber = new JTextField();
        tfPhoneNumber.setBounds(180,320,200,30);
        tfPhoneNumber.setFont(new Font("serif",Font.BOLD,15));
        add(tfPhoneNumber);
        
        JLabel lblEmail = new JLabel("Email id");
        lblEmail.setBounds(400,320,120,30);
        lblEmail.setFont(new Font("serif",Font.BOLD,15));
        lblEmail.setBorder(new EmptyBorder(2,1,2,1));
        lblEmail.setHorizontalAlignment(JLabel.RIGHT);
        add(lblEmail);
        
        tfEmail = new JTextField();
        tfEmail.setBounds(540,320,200,30);
        tfEmail.setFont(new Font("serif",Font.BOLD,15));
        add(tfEmail);
        
        submit = new JButton("Submit");
        submit.setBounds(273,430,100,40);
        submit.setBackground(Color.BLACK);
        submit.setForeground(Color.WHITE);
        submit.setFont(new Font("Tahoma",Font.BOLD,16));
        submit.addActionListener(this);
        add(submit);
        
        cancel = new JButton("Cancel");
        cancel.setBounds(450,430,100,40);
        cancel.setBackground(Color.BLACK);
        cancel.setForeground(Color.WHITE);
        cancel.setFont(new Font("Tahoma",Font.BOLD,16));
        cancel.addActionListener(this);
        add(cancel);

        setVisible(true);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }
    public void actionPerformed(ActionEvent e){
        if(e.getSource()==submit){
            String name = tfName.getText();
            String fathersName = tfFathersName.getText();
            String mothersName = tfMothersName.getText();
            String rollNo = rollno.getText();
            String dob = ((JTextField)dcDob.getDateEditor().getUiComponent()).getText();
            String gender = (String) cbGender.getSelectedItem();
            String degree = (String) cbDegree.getSelectedItem();
            String branch = (String) cbBranch.getSelectedItem();
            String address = tfAddress.getText();
            String phoneNumber = tfPhoneNumber.getText();
            String emailId = tfEmail.getText();
            try{

                String query = "Insert into student values ('" + name + "', '"+rollNo+"', '"+fathersName+"', '"+mothersName+"', '"+dob+"', '"+gender+"', '"+degree+"', '"+branch+"', '"+address+"', '"+phoneNumber+"', '"+emailId+"');";
    
                conn newconn = new conn();
                newconn.s.executeUpdate(query);
                JOptionPane.showMessageDialog(null, "Student details added successfully");
            }
            catch(Exception ee){
                ee.printStackTrace();
            }
        }
        else{
            dispose();
        }
    }
    public static void main(String []args){
        new addStudent();
    }
}
