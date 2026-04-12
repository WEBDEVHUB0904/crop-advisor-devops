resource "aws_key_pair" "k8s_key" {
  key_name   = "${var.project_name}-key"
  public_key = file(pathexpand("~/.ssh/k8s-key.pub"))
}

resource "aws_instance" "k8s_master" {
  ami                    = var.ubuntu_ami
  instance_type          = var.master_instance_type
  key_name               = aws_key_pair.k8s_key.key_name
  subnet_id              = aws_subnet.k8s_public_subnet.id
  vpc_security_group_ids = [aws_security_group.k8s_master_sg.id]

  root_block_device {
    volume_type = "gp3"
    volume_size = 20
  }

  tags = {
    Name    = "${var.project_name}-master"
    Role    = "control-plane"
    Project = var.project_name
  }
}

resource "aws_eip" "k8s_master" {
  domain = "vpc"

  tags = {
    Name    = "${var.project_name}-master-eip"
    Role    = "control-plane"
    Project = var.project_name
  }
}

resource "aws_eip_association" "k8s_master" {
  allocation_id = aws_eip.k8s_master.id
  instance_id   = aws_instance.k8s_master.id
}

resource "aws_instance" "k8s_workers" {
  count                  = var.worker_count
  ami                    = var.ubuntu_ami
  instance_type          = var.worker_instance_type
  key_name               = aws_key_pair.k8s_key.key_name
  subnet_id              = aws_subnet.k8s_public_subnet.id
  vpc_security_group_ids = [aws_security_group.k8s_worker_sg.id]

  root_block_device {
    volume_type = "gp3"
    volume_size = 20
  }

  tags = {
    Name    = "${var.project_name}-worker-${count.index + 1}"
    Role    = "worker"
    Project = var.project_name
  }
}

resource "aws_eip" "k8s_workers" {
  count  = var.worker_count
  domain = "vpc"

  tags = {
    Name    = "${var.project_name}-worker-${count.index + 1}-eip"
    Role    = "worker"
    Project = var.project_name
  }
}

resource "aws_eip_association" "k8s_workers" {
  count         = var.worker_count
  allocation_id = aws_eip.k8s_workers[count.index].id
  instance_id   = aws_instance.k8s_workers[count.index].id
}