# REQUIREMENTS
## Compatability
Check the back of your pod where you plug in the water tubes,
- Pod 3 - FCC ID: 2AYXT61100001
- Currently requires you to firmware reset your pod by holding the smaller button in the back of your pod when powering up. Your device should flash green


## 1. Connect to device

```
minicom -b 921600 -o -D /dev/tty.usbserial-B0010NHK
```

### 2. Interrupt uboot 

You can just hit CTRL + C when you see `Hit any key to stop autoboot`
![Interrupt](docs/installation/1_interrupt.png)

If you did it correctly, you'll see this 

![Interrupt success](docs/installation/2_shell.png)


### 3.Modify the boot environment, this allows us to get root access

```
# If you have current_slot=a
setenv bootargs "root=PARTLABEL=rootfs_a rootwait init=/bin/bash"

# A bunch of text will popup on your screen, let it finish and you'll eventually see `bash-5.1# `
run bootcmd
```


### 4. Mount the file system

```
# Mount /proc for process and system information
mount -t proc proc /proc

# Mount /sys for hardware and system-level information
mount -t sysfs sysfs /sys

# Mount /dev for device files (e.g., /dev/mmcblk0)
mount -t devtmpfs devtmpfs /dev

# Mount /run (optional but useful for some runtime scripts)
mount -t tmpfs tmpfs /run

# Mount the file system in read write mode (BE CAREFUL EDITING MODIFYING FILES)
mount -o remount,rw /
```

### 5. Update password for root & rewt

```
passwd root
passwd rewt
```

### 6. Sync the file changes

```
sync
```

### 7. Reboot (DO NOT INTERRUPT BOOT THIS TIME)

```
reboot -f
```

### 8. Login as root with the password we set

![Login](docs/installation/3_login.png)



### 9. Disable software updates

```
# Disables the software updates
systemctl disable --now swupdate-progress swupdate defibrillator eight-kernel telegraf vector frankenfirmware dac swupdate.socket

# Blocks the software updates if we ever restart or power off the device
systemctl mask swupdate-progress swupdate defibrillator eight-kernel telegraf vector frankenfirmware dac swupdate.socket
```

### 10. Setup internet access

```
# Replace WIFI_NAME and PASSWORD with your actual WiFi credentials
# (WIFI_NAME appears twice)
# 
# DO NOT USE A GUEST NETWORK OR TRY TO DO ANYTHING FANCY TO PREVENT IT FROM TALKING TO THE INTERNET
#   If you want to block internet access to the pod, we can do that with firewall rules later

nmcli connection add type wifi con-name WIFI_NAME ifname wlan0 ssid WIFI_NAME wifi-sec.key-mgmt wpa-psk wifi-sec.psk "PASSWORD" ipv4.method auto ipv6.method auto

# Reload the network manager
nmcli connection reload
```

### 11. Install the app

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/throwaway31265/free-sleep/main/scripts/install.sh)"
```


### 12. Get your pods IP address

```
# Yours will be different, that's okay
nmcli -g ip4.address device show wlan0
192.168.1.50/24
```

### 13. With a device connected to the SAME Wi-Fi network, navigate to your pod's IP address (port 3000)

SET YOUR TIME ZONE, OR ELSE SCHEDULING WILL NOT WORK!

http://192.168.1.50:3000/

![Web App](docs/installation/4_web_app.png)


### 14. Add firewall rules to block access to the internet (optional)
```
sh /home/dac/free-sleep/scripts/block_internet_access.sh

# You can undo this with 
sh /home/dac/scripts/unblock_internet_access.sh
```







