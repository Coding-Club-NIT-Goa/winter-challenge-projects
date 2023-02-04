package universitymanagementsystem;
import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

public class project extends JFrame implements ActionListener{

    project(){
        setTitle("Admin Portal");
        ImageIcon i1 = new ImageIcon(ClassLoader.getSystemResource("icons/covernitgoa.jpg"));
        Image i2 = i1.getImage().getScaledInstance(800, 450, Image.SCALE_DEFAULT);
        ImageIcon i3 = new ImageIcon(i2);
        JLabel image = new JLabel(i3);
        add(image);

        JMenuBar mb = new JMenuBar();
        setJMenuBar(mb);

        // Add new Info
        JMenu AddInfo = new JMenu("Add New Info");
        AddInfo.setForeground(Color.BLUE);
        mb.add(AddInfo);

        JMenuItem facultyInfo = new JMenuItem("New Faculty Info");
        AddInfo.add(facultyInfo);
        
        JMenuItem studentInfo = new JMenuItem("New Student Info");
        studentInfo.addActionListener(this);
        AddInfo.add(studentInfo);
        
        // View Details
        JMenu viewInfo = new JMenu("View Details");
        viewInfo.setForeground(Color.RED);
        mb.add(viewInfo);

        JMenuItem facultyDetails = new JMenuItem("View Faculty Details");
        viewInfo.add(facultyDetails);
        
        JMenuItem studentDetails= new JMenuItem("View Student Details");
        viewInfo.add(studentDetails);
        
        // Apply Leave
        JMenu applyLeave = new JMenu("Apply Leave");
        applyLeave.setForeground(Color.BLUE);
        mb.add(applyLeave);

        JMenuItem facultyLeave = new JMenuItem("Apply Faculty Leave");
        applyLeave.add(facultyLeave);
        
        JMenuItem studentLeave= new JMenuItem("Apply Student Leave");
        applyLeave.add(studentLeave);
        
        // Leave Details
        JMenu leaveDetails = new JMenu("Leave Details");
        leaveDetails.setForeground(Color.RED);
        mb.add(leaveDetails);

        JMenuItem facultyLeaveDetails = new JMenuItem("Faculty Leave Details");
        leaveDetails.add(facultyLeaveDetails);
        
        JMenuItem studentLeaveDetails = new JMenuItem("Student Leave Details");
        leaveDetails.add(studentLeaveDetails);
        
        // Leave Details
        JMenu examination = new JMenu("Examination");
        examination.setForeground(Color.BLUE);
        mb.add(examination);

        JMenuItem viewResult = new JMenuItem("Exam Results");
        examination.add(viewResult);
        
        JMenuItem enterMarks = new JMenuItem("Enter Marks");
        examination.add(enterMarks);
        
        // Fee Details
        JMenu fee = new JMenu("Fee Details");
        fee.setForeground(Color.RED);
        mb.add(fee);

        JMenuItem feeStructure = new JMenuItem("Fee Structure");
        fee.add(feeStructure);
        
        JMenuItem feeForm = new JMenuItem("Student Fee Form");
        fee.add(feeForm);
        
        // Utility
        JMenu Utility = new JMenu("Utility");
        Utility.setForeground(Color.BLUE);
        mb.add(Utility);

        JMenuItem notepad = new JMenuItem("Notepad");
        notepad.addActionListener(this);
        Utility.add(notepad);
        
        JMenuItem calculator = new JMenuItem("Calculator");
        calculator.addActionListener(this);
        Utility.add(calculator);
        
        // More
        JMenu More = new JMenu("More");
        More.setForeground(Color.RED);
        mb.add(More);

        JMenuItem about = new JMenuItem("About");
        More.add(about);
        
        JMenuItem quit = new JMenuItem("Quit");
        quit.addActionListener(this);
        More.add(quit);

        setLocation(266,96);
        setSize(800,550);
        setVisible(true);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }

    public void actionPerformed(ActionEvent e){
        String msg = e.getActionCommand();
        if(msg=="Quit"){
            dispose();
        }
        else if(msg=="New Student Info"){
            dispose();
            new addStudent();
        }
        else if(msg=="Calculator"){
            try{
                Runtime.getRuntime().exec("Calc.exe");
            }
            catch(Exception ex){
                
            }
        }
        else if(msg=="Notepad"){
            try{
                Runtime.getRuntime().exec("Notepad.exe");
            }
            catch(Exception ex){
                
            }

        }
    }

    public static void main(String []args){
        new project();
    }
}
