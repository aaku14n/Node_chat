def main():
    num_students = get_int_input("Enter the number of students: ",1)
    num_subjects = get_int_input("Enter the number of subjects: ",2)
    student_data = [["" for j in range(num_subjects + 1)] for i in range(num_students)]

    for i in range(num_students):
        print(f"Enter data for student {i + 1}:")
        student_data[i][0] = get_input("Name of student: ")

        for j in range(1, num_subjects + 1):
            marks = get_int_input(f"Enter marks for subject {j}: ", 0, 100)

            student_data[i][j] = str(marks)

    rank = get_int_input("Enter the rank to find: ", 1, num_students)

    for i in range(1, num_subjects + 1):
        print(f"Subject {i}:")
        sorted_data = sort_data(student_data, i)

        if rank <= num_students:
            print(f"{rank} rank: {sorted_data[rank - 1][0]}")
        else:
            print("Invalid rank.")


def get_input(prompt):
    while True:
        value = input(prompt)

        if value:
            return value

        print("Please enter a value.")


def get_int_input(prompt, min_value=None, max_value=None):
    while True:
        value = input(prompt)

        if value:
            try:
                value = int(value)

                if min_value is not None and value < min_value:
                    raise ValueError()

                if max_value is not None and value > max_value:
                    raise ValueError()

                return value

            except ValueError:
                pass

        print("Please enter a valid integer value.")

if __name__ == "__main__":
    main()