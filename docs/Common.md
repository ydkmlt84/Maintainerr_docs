
> !!! info
    These are not going to solve *every* problem and the suggested solutions might not correct your problem. If you have tried what is laid out here and it still isn't working as expected. Please reach out on [Discord](https://discord.gg/WP4ZW2QYwk).

## Spinning Circle

Q. I have installed Maintainerr but when I try to view it, all I can see on the page is a spinning circle.

A. This is due to a permissions problem. The container runs by default as user 1000 and the data volume you have set does not have permissions set correctly for that user.

??? example "See The Fix?"
    run the command `sudo chown -R 1000:1000 <host-directory for /opt/data>`

## Stuck and can't click on anything.

Q. When I open the page for the first time I can click on  things but nothing is happening.

A. When the Maintainerr page loads up for the very first time, it is supposed to auto-direct to the Plex settings page. Sometimes it doesn't work and the page looks stuck.

??? example "See The Fix?"
    refresh the page
