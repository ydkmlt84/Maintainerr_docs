Below is a list of common questions or problems during installation/configuration/etc.

> !!! info
This is not going to solve every problem and the suggested solutions might not correct your problem. If you have tried what is laid out here and it still isn't working as expected. Please reach out on [Discord](https://discord.gg/WP4ZW2QYwk).

## Spinning Circle
 Q. I have installed Maintainerr but when I try to view it, all I can see on the page is a spinning circle.

 A. This is due to a permissions problem. The container runs by default as user 1000 and the data volume you have set does not have permissions set correctly for that user.

??? beaker "See The Fix?"
    run the command `sudo chown -R 1000:1000 .data`