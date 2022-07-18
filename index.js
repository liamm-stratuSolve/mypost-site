function pageLoader(){
    let sessionStatus = sessionStorage.getItem('status');
    let sessionUserName = sessionStorage.getItem('Username');

    if (sessionStatus === "loggedIn" && sessionUserName) {
        loadHomePage();
    } else {
        loadLoginPage();
    }
}

function alertMessage(header, message, method) {
    let modalFade = document.createElement("div");
    modalFade.className = "modal fade";
    modalFade.id = "modalCentered";
    modalFade.tabIndex = -1;
    modalFade.role = "dialog";
    modalFade.setAttribute("aria-labelledby", "modalCenterTitle");
    modalFade.setAttribute("aria-hidden", "true");

    let modalDialog = document.createElement("div");
    modalDialog.className = "modal-dialog modal-dialog-centered";
    modalDialog.role = "document";
    modalFade.appendChild(modalDialog);

    let modalContent = document.createElement("div");
    modalContent.className = "modal-content";
    modalDialog.appendChild(modalContent);

    let modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalContent.appendChild(modalHeader);

    let modalTitle = document.createElement("h5");
    modalTitle.className = "modal-title";
    modalTitle.id = "modalLongTitle";
    modalTitle.innerText = header;
    modalHeader.appendChild(modalTitle);

    let modalBody = document.createElement("div");
    modalBody.className = "modal-body";

    let modalBodyText = document.createElement("p");
    modalBodyText.innerText = message;
    modalBody.appendChild(modalBodyText);
    modalContent.appendChild(modalBody);

    let modalFooter = document.createElement("div");
    modalFooter.className = "modal-footer";

    let modalButton = document.createElement("button");
    modalButton.className = "btn btn-primary";
    modalButton.setAttribute("data-dismiss", "modal");
    modalButton.setAttribute("data-target", "#modalCentered");
    modalButton.innerText = "Close";

    modalButton.addEventListener(
        'click', () => {
            $("#modalCentered").modal('hide');
            $("#modalCentered").remove();
            method();
        }
    )

    modalFooter.appendChild(modalButton);
    modalContent.appendChild(modalFooter);

    let rootDiv = document.getElementById("root");
    rootDiv.appendChild(modalFade);
}