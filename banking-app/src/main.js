import './input.css'

const config = {
    initialForm: document.querySelector("#initial-form"),
    bankPage: document.querySelector("#bank-page")
}

class BankAccount{

    constructor(firstName,lastName,email,type,accountNumber, money){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.type = type;
        this.accountNumber = accountNumber;
        this.money = money;
        this.initialDeposit = money;
    }

    getFullName(){
        return this.firstName + " " + this.lastName
    }

}

// min-max 間のランダムな整数を返す
const getRandomInteger = (min,max) => {
    let NumOfRandom = Math.floor(Math.random() * (max - min) + min);
    return NumOfRandom;
}

// index.htmlのpage-1の"submit"がクリックされると入力されたデータに応じてオブジェクトを作成
const initializeUserAccount = () => {
    const form = document.querySelector("#initial-form");
    let userBankAccount = new BankAccount(
        form.querySelector("#first-name").value,
        form.querySelector("#last-name").value,
        form.querySelector("#email").value,
        form.querySelector("input[name='userAccountType']:checked").value,
        getRandomInteger(1, Math.pow(10,8)),
        // int型として渡します。
        parseInt(form.querySelector("#deposit").value)
    )

    // ページを切り替え
    config.initialForm.style.display = "none";
    console.log(config.bankPage)
    config.bankPage.append(mainBankPage(userBankAccount))

    console.log(userBankAccount);
};

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector("#initial-form");
    
    // フォームの送信イベントにリスナーを追加
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // デフォルトの送信動作を防ぐ
        initializeUserAccount();
    });
});

const mainBankPage = (bankAccount) => {
    // メインコンテナの作成
    const bankPage = document.createElement('div');
    bankPage.id = 'bank-page';
    
    bankPage.classList.add('grid', 'place-items-center', 'h-screen', 'bg-gray-700');

    // 内部コンテナの作成
    const innerContainer = document.createElement('div');
    innerContainer.classList.add('grid', 'border-gray-500', 'w-2/3', 'h-2/5', 'bg-[#4BA3A1]', 'px-6', 'py-4');

    // ユーザー情報セクションの作成
    const userInfoSection = document.createElement('div');
    userInfoSection.classList.add('text-white', 'flex', 'flex-col', 'items-end', 'space-y-1');

    const userInfoItems = [
        `Your Name: ${bankAccount.firstName} ${bankAccount.lastName}`,
        `Your Bank ID: ${bankAccount.accountNumber}`,
        `Your First Deposit: $${bankAccount.initialDeposit.toFixed(2)}`
    ];

    userInfoItems.forEach((item, index) => {
        const p = document.createElement('p');
        p.classList.add('text-xl');
        if (index === 0) p.classList.add('m-0', 'mt-1');
        p.textContent = item;
        userInfoSection.appendChild(p);
    });

    // 残高表示セクションの作成
    const balanceSection = document.createElement('div');
    balanceSection.classList.add('grid', 'grid-cols-2', 'grid-rows-[4rem]', 'items-center', 'text-white', 'bg-red-600', 'h-16', 'px-4');

    const balanceLabel = document.createElement('p');
    balanceLabel.classList.add('justify-self-start', 'self-center', 'text-3xl');
    balanceLabel.textContent = 'Available Balance';

    const balanceAmount = document.createElement('p');
    balanceAmount.classList.add('justify-self-end', 'self-center', 'text-3xl');
    balanceAmount.textContent = `$${bankAccount.money.toFixed(2)}`;

    balanceSection.appendChild(balanceLabel);
    balanceSection.appendChild(balanceAmount);

    // ボタンセクションの作成
    const buttonSection = document.createElement('div');
    buttonSection.classList.add('grid', 'grid-cols-3', 'gap-2');

    const buttons = [
        { text: 'WITHDRAWAL', icon: 'fa-wallet', link: './page3.html' },
        { text: 'DEPOSIT', icon: 'fa-coins' },
        { text: 'COME BACK LATER', icon: 'fa-house-chimney' }
    ];

    buttons.forEach((buttonInfo, index) => {
        const buttonContainer = document.createElement(index === 0 ? 'a' : 'button');
        buttonContainer.classList.add('flex', 'flex-col', 'items-center', 'justify-center', 'bg-[#1A4567]', 'hover:bg-opacity-75', 'cursor-pointer');
        if (index === 0) buttonContainer.href = buttonInfo.link;

        const button = document.createElement(index === 0 ? 'button' : 'div');
        button.classList.add('flex', 'flex-col', 'items-center', 'justify-center', 'gap-3');

        const span = document.createElement('span');
        span.classList.add('text-2xl', 'text-white');
        span.textContent = buttonInfo.text;

        const icon = document.createElement('i');
        icon.classList.add('fa-solid', buttonInfo.icon, 'text-4xl', 'text-white');

        button.appendChild(span);
        button.appendChild(icon);
        buttonContainer.appendChild(button);
        buttonSection.appendChild(buttonContainer);
    });

    // 全ての要素を組み立てる
    innerContainer.appendChild(userInfoSection);
    innerContainer.appendChild(balanceSection);
    innerContainer.appendChild(buttonSection);
    bankPage.appendChild(innerContainer);

    return bankPage;
};





