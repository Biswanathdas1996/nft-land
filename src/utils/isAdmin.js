const adminAccount = ["0xb78b8053B701a8e83bE191431533090A51fbF7ED","0xd342a892FbC0ee08C8cBCA15145031d7d4378Cb1","0x9A135C4d43b9fc6c4d5669d29e6442D7702F841c"];

export function isAdmin(currentAccount) {
  if (adminAccount.includes(currentAccount)) {
    return true;
  } else {
    return false;
  }
}
